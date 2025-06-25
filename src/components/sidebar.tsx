import Logo from "@/components/images/isotype.svg?react";

export default function Sidebar() {
  return (
    <div className="dark:bg-gray-800 h-full border-r border-r-gray-700">
      {/* top section with logo */}
      <div className="p-3 flex space-x-3 items-center">
        <Logo className="size-10" />
        <div className="flex flex-col">
          <span className="font-medium dark:text-gray-300">Porla</span>
          <span className="text-sm text-gray-500">v1.0 (d57cfea3)</span>
        </div>
      </div>
    </div>
  )
}
