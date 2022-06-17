import type { Component } from "solid-js";
import type { EpisodeResponse } from "./@types/typeModule";
import { createSignal, createEffect, onMount, onCleanup, For } from "solid-js";
import axios from "axios";

import { EpisodeWrapper } from "./components/EpisodeWrapper";

const App: Component = () => {
  const fetchEpisodes = async (optionalUrl?: string) => {
    return axios.get<EpisodeResponse>(
      optionalUrl ?? "https://rickandmortyapi.com/api/episode"
    );
  };

  const [episodes, setEpisodes] = createSignal<EpisodeResponse>();
  const [page, setPage] = createSignal<number>(1);

  const fetchMoreImages = async () => {
    //Fetching episodes with axios
    setPage(page()+1)
    setEpisodes((await fetchEpisodes(`https://rickandmortyapi.com/api/episode?page=${page()}`)).data);
    // window.scrollY = 0;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchMoreImages();
    }
  };

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onMount(async () => {
    setEpisodes((await fetchEpisodes()).data);
  });

  onCleanup(async () => {
    window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div class="flex justify-center items-center flex-col p-10">
      <h2 class=" font-medium text-4xl my-5">Rick and Morty</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <For each={episodes()?.results} fallback={<p>Loading...</p>}>
          {(episode) => (
            <div>
              <EpisodeWrapper episode={episode} />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
