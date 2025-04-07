import { StackClient } from "@stackso/js-core";

const getStackClient = () => {
  // Check if Stack API key is available
  const apiKey = process.env.STACK_API_KEY;
  
  if (!apiKey || apiKey === "your-stack-api-key") {
    console.warn("No valid Stack API key provided. Returning mock client.");
    // Return a mock client that has the same API but doesn't make actual requests
    return {
      getTags: async () => {
        return { tagData: null };
      },
      // Add other methods as needed
    } as unknown as StackClient;
  }

  const stack = new StackClient({
    apiKey: apiKey,
    pointSystemId: parseInt(
      process.env.NEXT_PUBLIC_IDENTITY_STACK_POINT_ID as string,
      10,
    ),
  });

  return stack;
};

export default getStackClient;
