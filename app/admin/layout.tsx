import Sidebar from "@/components/layout/sidebar"
// import Notification from "@/components/notification/notification"
export default function adminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="bg-background-light dark:bg-background-dark font-display text-text-gray-200 dark:text-white transition-colors duration-200 antialiased overflow-hidden">
        <div className="flex h-screen w-full">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {children}
            </main>
            {/* <Notification /> */}
        </div>
    </div>
}
