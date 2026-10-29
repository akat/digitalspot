<template>
  <div class="agency-site flex min-h-screen flex-col">
    <PreviewBanner />
    <SiteHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
