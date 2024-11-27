import DashboardNavbar from "@/app/(routes)/_components/Dashboard-navbar";
import Sidebar from "@/app/(routes)/_components/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <div>
            <div className="fixed md:w-64 hidden md:block">
                <Sidebar />
            </div>
            <div className="md:ml-64 ">
                <DashboardNavbar/>
                {children}
            </div>
        </div>
    )
}

