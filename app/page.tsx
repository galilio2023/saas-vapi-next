import React from "react";
import { Button } from "@/components/ui/button";

const Page = () => {
  // 1. Error: Hardcoded secret (Security Risk)
  const apiKey = "12345-secret-key";
  return (
    <div>
      <h1 className="text-2xl underline">Welcome to my SaaS App</h1>
      <Button>Let&#39;s get started</Button>
      <div className="bg-[#invalid-color-syntax] p-4">
        <h1>Hello Converso</h1>
        {/* 3. Logic error: Mapping over undefined */}
        {undefined.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Page;
