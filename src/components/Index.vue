<template>
    <div>
        <SysHeader />
        <SectionsHero />
        <SectionsIntro />
        <SectionsFeatures />
        <SectionsBrands />
        <SectionsTestimonials />
        <SysFooter />
    </div>
</template>

<script>
import SysFooter from './Footer'
import SysHeader from './Header'
import SectionsHero from './sections/Hero'
import SectionsIntro from './sections/Intro'
import SectionsBrands from './sections/Brands'
import SectionsFeatures from './sections/Features'
import SectionsTestimonials from './sections/Testimonials'

export default {
    components: {
        SysHeader,
        SysFooter,
        SectionsHero,
        SectionsIntro,
        SectionsFeatures,
        SectionsBrands,
        SectionsTestimonials
    }
}
</script>
