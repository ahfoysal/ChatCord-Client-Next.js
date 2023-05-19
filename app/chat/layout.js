import SideNav from "@/component/sidebar/SideNav";

 
export default function Layout({ children }) {
  return (
    <div className="main h-screen bg-[url('/images/pattern.png')]   w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
    <div className="flex-1 flex flex-col">
    <div className="flex-grow flex flex-row min-h-0">
      <SideNav/>
      <>{children}</>
      </div>
    </div>
     
      </div>
  );
}