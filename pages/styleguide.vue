<template>
  <AppStickyLogo>
    <div class="grid grid-cols-12 gap-[20px] items-center min-h-screen wrapper">
      <div class="col-span-4 col-start-7 aspect-[2/3] bg-[tomato]" />
    </div>

    <div class="scetion wrapper">
      <CardCta
        title="Private Dining"
        copy="We make room for the curious."
      >
        <template #image>
          <div class="aspect-[16/9] bg-[tomato]" />
        </template>
      </cardcta>
    </div>

    <div class="grid grid-cols-12 gap-[20px] items-center py-[7.8vw] wrapper">
      <div class="col-span-6 col-start-1 aspect-[3/2] bg-[tomato] z-1" />
    </div>

    <div class="grid grid-cols-12 gap-[20px] items-center py-[7.8vw] wrapper">
      <div class="col-span-6 col-start-4 aspect-[16/9] bg-[tomato] z-1" />
    </div>

    <!-- <Screen :log="seo_image" /> -->

    <div class="section wrapper">
      <h1 class="type-h1 opacity-40">
        Styleguide
      </h1>

      <div class="prose">
        <h1 class="type-h1">
          Heading 1
        </h1>

        <h2 class="type-h2">
          Heading 2
        </h2>

        <h3 class="type-h3">
          Heading 3
        </h3>

        <h4 class="type-h4">
          Heading 4
        </h4>

        <h5 class="type-h5">
          Heading 5
        </h5>

        <h6 class="type-h6">
          Heading 6
        </h6>

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
        <ButtonAppearance type="green">
          Button
        </ButtonAppearance>
      </button>

      <br>

      <br>

      <button type="button">
        <ButtonAppearanceAlt type="green">
          Button Alt
        </ButtonAppearanceAlt>
      </button>

      <br>

      <br>

      <button type="button">
        <LinkAppearance>
          Link
        </LinkAppearance>
      </button>
    </div>

    <div class="bg-offwhite text-green">
      <div class="section wrapper">
        <div class="prose">
          <h1 class="type-h1">
            Heading 1
          </h1>

          <h2 class="type-h2">
            Heading 2
          </h2>

          <h3 class="type-h3">
            Heading 3
          </h3>

          <h4 class="type-h4">
            Heading 4
          </h4>

          <h5 class="type-h5">
            Heading 5
          </h5>

          <h6 class="type-h6">
            Heading 6
          </h6>

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
          <ButtonAppearance type="offwhite">
            Button
          </ButtonAppearance>
        </button>

        <br>

        <br>

        <button type="button">
          <ButtonAppearanceAlt type="offwhite">
            Button Alt
          </ButtonAppearanceAlt>
        </button>

        <br>

        <br>

        <button type="button">
          <LinkAppearance>
            Link
          </LinkAppearance>
        </button>
      </div>
    </div>
  </AppStickyLogo>
</template>
