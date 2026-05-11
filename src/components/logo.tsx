import DarkLogo from "@/assets/logos/dark.svg";
import LogoImage from "@/assets/logos/main.svg";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <LogoImage className="h-full w-auto dark:hidden" role="presentation" />

      <DarkLogo
        className="hidden h-full w-auto dark:block"
        role="presentation"
      />
    </div>
  );
}
