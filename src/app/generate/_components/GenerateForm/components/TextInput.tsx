export const TextInput = () => (
  <div className="flex flex-col gap-3">
    <label htmlFor="prompt" className="text-sm text-primary-400">
      Type in the precise topic you seek.
    </label>
    <div className="relative">
      <textarea
        id="prompt"
        placeholder="Give me content for videos about ..."
        className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-2xl py-3 px-4 h-24 text-sm focus:outline-none resize-none"
      />
      <div className="absolute bottom-4 right-4 px-3 py-2 text-primary-400 text-xs font-medium bg-white rounded-full">
        ⌘ + Ent
      </div>
    </div>
  </div>
);
