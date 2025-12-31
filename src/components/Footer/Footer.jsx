
export default function Footer() {

    return (
        <footer
          className="w-full h-auto min-h-footer 
                   flex flex-row justify-around items-center text-center 
                   bg-text-main text-surface 
                   py-md px-lg"
        >
           <div className="bg-slate-900 text-white text-center p-4">
                <div className="flex-col md:flex-row justify-between items-center text-sm">
                    
                    <p className="hover:text-orange-400">© 2026 Mara Central. All rights reserved.</p>
                    
                    <p className="mt-2 md:mt-0 whitespace-nowrap hover:text-orange-400">
                        Designed by Chris and Emma
                    </p>
                    
                </div>
            </div>
        </footer>
    );
}