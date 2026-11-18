import { StoryInteractive } from "@/components/sections/story/StoryInteractive";
import { storyContent } from "@/lib/data/story";

export function Story() {
  return <StoryInteractive content={storyContent} />;
}
