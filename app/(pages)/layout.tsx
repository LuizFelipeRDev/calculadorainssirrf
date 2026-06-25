import { theme } from "../styles/theme";


  export default function PagesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div style={{  minHeight: "100vh",paddingTop:100,backgroundColor:theme.colors.primary ,marginInline:'20%', paddingBottom:'2rem'}}>
        {children}
      </div>
    );
  }