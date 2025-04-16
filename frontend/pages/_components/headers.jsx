import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";

export const Headers = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <div>Logo</div>
        <p className="font-bold text-inherit">XYZcorp.</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Sales Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" variant="flat">
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
