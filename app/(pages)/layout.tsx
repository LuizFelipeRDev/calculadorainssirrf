import { theme } from "../styles/theme";


  export default function PagesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div style={{  minHeight: "90vh",paddingTop:90,backgroundColor:theme.colors.primary ,marginInline:'20%', paddingBottom:'2rem'}}>
        {children}
      </div>
    );
  }