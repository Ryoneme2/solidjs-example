import { For } from "solid-js";
import type { Result } from "../@types/typeModule";

type props = {
  episode: Result;
};

export const EpisodeWrapper = ({ episode }: props) => {
  return (
    <>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{episode.name}</div>
          <p class="text-gray-700 text-base">{episode.air_date}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
        <For each={episode.characters} fallback={<p>Loading...</p>}>
            {(character) => (
              <a href={character}>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{character.split('/')[character.split('/').length-1]}
                </span>
              </a>
            )}
          </For>
        </div>
      </div>
    </>
  );
};
