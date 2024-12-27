import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMediaQuery } from "usehooks-ts";

export default function ResponsiveSheet({
  children,
  open,
  title,
  description,
  onDismiss,
}: {
  children: React.ReactNode;
  open: boolean;
  title: string;
  description?: string;
  onDismiss: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onDismiss}>
        <SheetContent className="sm:max-w-[465px]">
          <SheetHeader className="text-left">
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <ScrollArea className="h-full">{children}</ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onDismiss}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DrawerHeader>
        <ScrollArea>{children}</ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose onClick={onDismiss} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
