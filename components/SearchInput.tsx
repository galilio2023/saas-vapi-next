"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Get initial value from URL so state and URL are synced
  const initialQuery = searchParams.get("topic") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // 2. Memoize the params string to prevent reference-based loops
  const paramsString = searchParams.toString();

  useEffect(() => {
    // 3. Optimization: If the state matches the URL, don't trigger a push
    const currentTopic = new URLSearchParams(paramsString).get("topic") || "";
    if (searchQuery === currentTopic) return;

    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (searchQuery) {
        newUrl = formUrlQuery({
          params: paramsString,
          key: "topic",
          value: searchQuery,
        });
      } else if (pathname === "/companions") {
        newUrl = removeKeysFromUrlQuery({
          params: paramsString,
          keysToRemove: ["topic"],
        });
      }

      if (newUrl) {
        router.push(newUrl, { scroll: false });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, pathname, paramsString]);

  return (
    <div className="relative flex h-fit items-center gap-2 rounded-lg border border-black px-2 py-1">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        placeholder="search companions..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
