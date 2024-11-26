"use client";

import { useQuery } from "@tanstack/react-query";

const Todos = () => {
  const {} = useQuery({
    queryKey: ['oka']
  });
  return <div></div>;
};

export default Todos;
