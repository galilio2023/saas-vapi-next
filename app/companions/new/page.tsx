import React from "react";
import CompanionForm from "@/components/CompanionForm";

const NewCompanion = () => {
  return (
    <main className="items-center justify-center md:w-2/3 lg:w-1/3">
      <article className="flex w-full flex-col gap-4">
        <h1>Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  );
};
export default NewCompanion;
