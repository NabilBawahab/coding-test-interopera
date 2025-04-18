import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  addToast,
} from "@heroui/react";
import { ButtonAI } from "./button-ai";
import { useState } from "react";

export const Headers = ({
  answer,
  question,
  loadingAI,
  handleAskQuestion,
  setQuestion,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Sales Dashboard"];

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <div>Logo</div>
        <p className="font-bold text-inherit">XYZcorp.</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link aria-current="page" href="/">
            Sales Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ButtonAI
            answer={answer}
            question={question}
            loadingAI={loadingAI}
            handleAskQuestion={handleAskQuestion}
            setQuestion={setQuestion}
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "primary"
                  : "foreground"
              }
              href="/"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
