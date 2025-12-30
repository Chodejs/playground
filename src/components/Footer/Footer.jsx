
export default function Footer() {

    return (
        <footer
          className="w-full h-auto min-h-footer 
                   flex flex-row justify-around items-center text-center 
                   bg-text-main text-surface 
                   py-md px-lg"
        >
            <p
                className="hover:text-accent text-md underline"
            >
                &copy; 2023 Your Company. All rights reserved.
            </p>
            <p
                className="hover:text-accent text-md"
            >
                Design by Chris and Emma
            </p>
        </footer>
    );
}