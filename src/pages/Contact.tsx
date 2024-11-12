import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <main className="w-full flex items-center justify-center max-w-lg">
      <div className="p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block">Name</label>
            <Input
              type="text"
              className="mt-1 block w-full"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block">Email</label>
            <Input
              type="email"
              className="mt-1 block w-full"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block">Message</label>
            <Textarea
              className="mt-1 block w-full"
              placeholder="Your Message"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-tertiary text-foreground py-2 rounded-lg hover:bg-tertiaryDark"
          >
            Send Message
          </Button>
        </form>
      </div>
    </main>
  );
}
