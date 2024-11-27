import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

export default function Contact() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;

    if (!message) return setError("Message is required");
    if (!name) return setError("Name is required");

    try {
      await axios.post(
        "https://quick-store-ian.vercel.app/feedback",
        {
          name,
          email,
          message,
          from: "ShowCache",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full flex items-center justify-center max-w-lg">
      <div className="p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block">Name</label>
            <Input
              type="text"
              className="mt-1 block w-full"
              placeholder="Your Name"
              ref={nameRef}
            />
          </div>
          <div>
            <label className="block">Email</label>
            <Input
              type="email"
              className="mt-1 block w-full"
              placeholder="Your Email"
              ref={emailRef}
            />
          </div>
          <div>
            <label className="block">Message</label>
            <Textarea
              className="mt-1 block w-full"
              placeholder="Your Message"
              ref={messageRef}
            />
          </div>
          {error && <p className="text-end -mt-2 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-tertiary text-white py-2 rounded-lg hover:bg-tertiaryDark"
          >
            Send Message
          </Button>
        </form>
      </div>
    </main>
  );
}
