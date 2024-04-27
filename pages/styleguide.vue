<template>
  <div>
    <section class="grid-box wrapper">
      <div
        :class="[
          'col-span-4 col-start-8',
          'row-start-1',
          'aspect-3/4 bg-[#CDBB9E]',
        ]"
      />

      <div
        :class="[
          'col-span-5 col-start-2',
          'row-start-3',
          'aspect-1/1 bg-[#200E02]',
        ]"
      />

      <div
        :class="[
          'col-span-4 col-start-9',
          'row-start-7',
          'aspect-2/3 bg-[#2D456B]',
        ]"
      />
    </section>

    <div class="section wrapper">
      <h1 class="type-h1 opacity-40">
        Styleguide
      </h1>

      <h1 class="type-h1 mb-20">
        Heading 1
      </h1>

      <h2 class="type-h2 mb-20">
        Heading 2
      </h2>

      <h3 class="type-h3 mb-20">
        Heading 3
      </h3>

      <h4 class="type-h4 mb-20">
        Heading 4
      </h4>

      <h5 class="type-h5 mb-20">
        Heading 5
      </h5>

      <h6 class="type-h6 mb-20">
        Heading 6
      </h6>

      <div class="prose">
        <p class="type-body max-w-[60ch]">
          Lorem ipsum dolor sit amet,
          <a href="#">consectetur adipisicing elit.</a> Vo luptatibus culpa porro
          placeat, doloremque ex aliquid, dolorem ut animi veritatis fugit,
          corrupti laudantium obcaecati debitis praesentium doloribus voluptate
          officia minima. Dolorum!
        </p>
      </div>

      <br>

      <button type="button">
        <AppearanceButton type="white">
          Button
        </AppearanceButton>
      </button>

      <br>

      <br>

      <button type="button">
        <AppearanceLink>
          Link
        </AppearanceLink>
      </button>
    </div>

    <div class="bg-offwhite text-green">
      <div class="section wrapper">
        <h1 class="type-h1 mb-20">
          Heading 1
        </h1>

        <h2 class="type-h2 mb-20">
          Heading 2
        </h2>

        <h3 class="type-h3 mb-20">
          Heading 3
        </h3>

        <h4 class="type-h4 mb-20">
          Heading 4
        </h4>

        <h5 class="type-h5 mb-20">
          Heading 5
        </h5>

        <h6 class="type-h6 mb-20">
          Heading 6
        </h6>

        <div class="prose">
          <p class="type-body max-w-[60ch]">
            Lorem ipsum dolor sit amet,
            <a href="#">consectetur adipisicing elit.</a> Vo luptatibus culpa porro
            placeat, doloremque ex aliquid, dolorem ut animi veritatis fugit,
            corrupti laudantium obcaecati debitis praesentium doloribus voluptate
            officia minima. Dolorum!
          </p>
        </div>

        <br>

        <button type="button">
          <AppearanceButton type="green">
            Button
          </AppearanceButton>
        </button>

        <br>

        <br>

        <button type="button">
          <AppearanceLink>
            Link
          </AppearanceLink>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.grid-box {
  --grid-columns: 12;
  --grid-max-width: 100vw;

  @screen 3xl {
    --grid-max-width: theme('screens.3xl');
  }

  --box-size: calc(((var(--grid-max-width) - var(--app-outer-gutter)) - (var(--app-inner-gutter) * (var(--grid-columns) - 1))) / var(--grid-columns));

  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, var(--box-size));
  gap: var(--app-inner-gutter);
}
</style>
