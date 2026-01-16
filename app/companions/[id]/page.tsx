import React from "react";
import { getCompanion } from "@/lib/actions/companions.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";
interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}
const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");

  const { name, subject, title, topic, duration } = companion;
  return (
    <main>
      <article className="rounded-border flex justify-between p-6 max-md:flex-row">
        <div className="flex items-center gap-2">
          <div
            className="flex size-[72px] items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName ?? "User"}
        userImage={user.imageUrl}
      />
    </main>
  );
};
export default CompanionSession;
