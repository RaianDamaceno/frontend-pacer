<template>
    <div>
        <SysHeader />
        <SectionsHero />
        <SectionsIntro />
        <SectionsCalloutBlock />
        <SectionsFeatures />
        <SectionsBrands />
        <SectionsTestimonials />
        <SysFooter />
    </div>
</template>

<script>
import SysFooter from './footer'
import SysHeader from './header'
import SectionsHero from './sections/Hero'
import SectionsIntro from './sections/Intro'
import SectionsBrands from './sections/Brands'
import SectionsFeatures from './sections/Features'
import SectionsCalloutBlock from './sections/CalloutBlock'
import SectionsTestimonials from './sections/Testimonials'

export default {
    components: {
        SysHeader,
        SysFooter,
        SectionsHero,
        SectionsIntro,
        SectionsCalloutBlock,
        SectionsFeatures,
        SectionsBrands,
        SectionsTestimonials
    },
    data() {
        return {
        }        
    },
}
</script>