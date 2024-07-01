import { db } from "@/server/db";
import stripe from "@/server/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CheckIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";

type Tier = {
  name: string;
  id: string;
  priceMonthly: string;
  description: string;
  features: string[];
  mostPopular: boolean;
  productId?: string;
};

const tiers: Tier[] = [
  {
    name: "Basic",
    id: "1",
    priceMonthly: "$0",
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Advanced",
    id: "2",
    priceMonthly: "$10",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Premium",
    id: "3",
    priceMonthly: "$25",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
    mostPopular: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BuyButton = ({ tier }: { tier: Tier }) => {
  const handleSwitchPlan = async () => {
    "use server";

    const session = await currentUser();

    if (!session) {
      auth().redirectToSignIn();
      return;
    }

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.id),
    });

    if (!user) throw new Error("User not found");
    if (!user.stripeCustomerId) throw new Error("Stripe customer not found");

    const userSubscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
    });

    // using the stripeCustomerId, if the user already has a subscription
    if (userSubscriptions.data.length > 0) {
      const prevItems = userSubscriptions.data[0]!.items.data;

      // Get previous subscriptions to delete them before adding the new one
      const itemsParams = prevItems.map((item) => ({
        id: item.id,
        deleted: true,
      }));

      await stripe.subscriptions.update(userSubscriptions.data[0]!.id, {
        items: [...itemsParams, { price: tier.productId, quantity: 1 }],
      });

      return;
    }

    if (process.env.NEXT_PUBLIC_DEBUG === "true") return;

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "paypal", "link"],
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: tier.productId,
          quantity: 1,
        },
      ],
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/"
          : `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/"
          : `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (!stripeSession.url) throw new Error("Stripe session not found");
    redirect(stripeSession.url);
  };

  return (
    <form action={handleSwitchPlan} className="flex justify-center">
      <button
        className={classNames(
          tier.mostPopular
            ? "bg-secondary-600 text-white shadow-sm hover:bg-secondary-500"
            : "text-secondary-600 ring-1 ring-inset ring-secondary-200 hover:ring-secondary-300",
          "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600",
        )}
      >
        Buy plan
      </button>
    </form>
  );
};

export default async function Pricing() {
  const dbTier = await db.query.tiers.findMany();

  tiers.forEach((tier) => {
    const foundTier = dbTier.find((t) => t.id === tier.id);
    if (foundTier) {
      tier.priceMonthly = `${foundTier.price} ${foundTier.currency}`;
      tier.productId = foundTier.productId ?? undefined;
    }
  });

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-secondary-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-primary-900 sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-primary-600">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
          quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-primary-200 xl:p-10",
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "text-secondary-600"
                        : "text-primary-900",
                      "text-lg font-semibold leading-8",
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-secondary-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-secondary-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-primary-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-primary-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-primary-600">
                    /month
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-primary-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-secondary-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <BuyButton tier={tier} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
