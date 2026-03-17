import Sidebar from "@/components/layout/sidebar"
// import Notification from "@/components/notification/notification"
export default function adminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="bg-background-light dark:bg-[#0f141b] font-display text-text-gray-200 dark:text-white transition-colors duration-200 antialiased overflow-hidden">
        <div className="flex h-screen w-full gap-0">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-[#151b24]">
                {children}
            </main>
            {/* <Notification /> */}
        </div>
    </div>
}
