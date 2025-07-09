export function handleError(error: unknown) {
  let message = "An unknown error occurred";
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${message}`,
      },
    ],
    isError: true,
  };
}

export class Reach360Error extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "Reach360Error";
  }
}
