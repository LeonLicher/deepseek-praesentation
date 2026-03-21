<script setup>
import Divider from '@components/Divider.vue'
import AuthorList from './AuthorList.vue'

const info = $slidev.configs?.presentationInfo || { authors: [] }
</script>

<template>
  <div class="h-full grid grid-cols-5 bg-white relative overflow-hidden">
    <div class="col-span-3 flex flex-col relative z-10 px-8 pt-4 pb-15">
      <div class="flex items-center gap-14 mb-8 -ml-1.5">
        <img src="/images/fh-logo.jpg" alt="FH Münster" class="h-12" />
        <img src="/images/msb.png" alt="MSB" class="h-12" />
      </div>

      <div class="flex-1 flex flex-col justify-center pb-9">
        <h1 class="text-5xl font-black text-fh-blue leading-tight mb-5">
          Vielen Dank für Ihre Aufmerksamkeit!
        </h1>
        <p class="text-3xl text-gray-500">Gibt es noch Fragen?</p>
      </div>

      <Divider :length="100" color="border-fh-orange" thickness="border-t-2" class="mb-6" />

      <AuthorList :authors="info.authors" class="mt-6" />
    </div>

    <div class="col-span-2 relative">
      <div class="absolute right-0 top-0 h-full w-full opacity-40">
        <img src="/images/abstract_gitter.png" alt="" class="h-full w-full object-cover" />
      </div>
    </div>
  </div>
</template>
