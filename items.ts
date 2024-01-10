export const Items = {
  // @see https://github.com/nilswg/nilget/tree/tsup-example
  "tsup-example": (project_name) =>
    `git clone https://github.com/nilswg/nilget.git -b tsup-example ${project_name}`,

  // @see https://github.com/nilswg/nilget/tree/tsup-jest
  "tsup-jest": (project_name) =>
    `git clone https://github.com/nilswg/nilget.git -b tsup-jest ${project_name}`,

  // @see https://github.com/nilswg/nilget/tree/ts-example
  "ts-example": (project_name) =>
    `git clone https://github.com/nilswg/nilget.git -b ts-example ${project_name}`,

  // @see https://github.com/nilswg/pnpm-workspace
  "pnpm-workspace": (project_name) =>
    `git clone https://github.com/nilswg/pnpm-workspace.git -b main ${project_name}`,

  // @see https://github.com/nilswg/tailwind-example
  "tailwind-example": (project_name) =>
    `git clone https://github.com/nilswg/tailwind-example.git -b main ${project_name}`,

  // @see https://github.com/nilswg/nilget/tree/astro-tailwind-storybook
  "astro-tailwind-storybook": (project_name) =>
    `git clone https://github.com/nilswg/nilget.git -b tsup-jest ${project_name}`,
} as const;

export type ItemsProps = typeof Items;

export const getItemsList = () => {
  return Object.keys(Items);
};
