const m = new Map<string, number>();
m.set("a", 1);
m.set("b", 2);
m.set("c", 3);

m.keys().filter((key) => {
  return key === "a";
});
