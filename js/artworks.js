// Artwork collection data
const artworksData = [
    {
        id: 1,
        title: "SELF PORTRAIT 01",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_1.jpg"
    },
    {
        id: 2,
        title: "SELF PORTRAIT 02",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_2.jpg"
    },
    {
        id: 3,
        title: "SELF PORTRAIT 03",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_3.jpg"
    },
    {
        id: 4,
        title: "UNTITLED",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_4.jpg"
    },
    {
        id: 5,
        title: "URBAN SERIES 01",
        description: "Urban photography, 2016",
        category: "photography",
        imagePath: "images/photography_1.jpg"
    },
    {
        id: 6,
        title: "ALPINE SCENERIES 01",
        description: "Landscape photography, 2018",
        category: "photography",
        imagePath: "images/photography_2.jpg"
    },
    {
        id: 7,
        title: "EUROPEAN SNAPSHOTS 01",
        description: "Landscape photography, 2019",
        category: "photography",
        imagePath: "images/photography_3.jpg"
    },
    {
        id: 8,
        title: "URBAN SERIES 02",
        description: "Urban photography, 2019",
        category: "photography",
        imagePath: "images/photography_4.jpg"
    },
    {
        id: 9,
        title: "NORDIC LANDSCAPES 01",
        description: "Landscape photography, 2018",
        category: "photography",
        imagePath: "images/photography_5.jpg"
    },
    {
        id: 10,
        title: "NORDIC LANDSCAPES 02",
        description: "Landscape photography, 2018",
        category: "photography",
        imagePath: "images/photography_iceland_1.jpg"
    },
    {
        id: 11,
        title: "NORDIC LANDSCAPES 03",
        description: "Landscape photography, 2018",
        category: "photography",
        imagePath: "images/photography_6.jpg"
    },
    {
        id: 12,
        title: "NORDIC LANDSCAPES 04",
        description: "Landscape photography, 2018",
        category: "photography",
        imagePath: "images/photography_iceland_2.jpg"
    },
    {
        id: 13,
        title: "ALPINE SCENERIES 02",
        description: "Landscape photography, 2018",
        category: "photography",
        imagePath: "images/photography_7.jpg"
    },
    {
        id: 14,
        title: "ALPINE SCENERIES 03",
        description: "Landscape photography, 2018",
        category: "photography",
        imagePath: "images/photography_8.jpg"
    },
    {
        id: 15,
        title: "EUROPEAN SNAPSHOTS 02",
        description: "Urban photography, 2019",
        category: "photography",
        imagePath: "images/photography_9.jpg"
    },
    {
        id: 16,
        title: "LIVE MUSIC SERIES 01",
        description: "Concert photography, 2023",
        category: "photography",
        imagePath: "images/photography_concert_1.jpg"
    },
    {
        id: 17,
        title: "LIVE MUSIC SERIES 02",
        description: "Concert photography, 2023",
        category: "photography",
        imagePath: "images/photography_concert_2.jpg"
    },
    {
        id: 18,
        title: "LIVE MUSIC SERIES 03",
        description: "Concert photography, 2023",
        category: "photography",
        imagePath: "images/photography_concert_3.jpg"
    },
    {
        id: 19,
        title: "LIVE MUSIC SERIES 04",
        description: "Concert photography, 2023",
        category: "photography",
        imagePath: "images/photography_concert_4.jpg"
    },
    {
        id: 20,
        title: "LIVE MUSIC SERIES 05",
        description: "Concert photography, 2023",
        category: "photography",
        imagePath: "images/photography_concert_5.jpg"
    },
    {
        id: 21,
        title: "LIVE MUSIC SERIES 06",
        description: "Concert photography, 2023",
        category: "photography",
        imagePath: "images/photography_concert_6.jpg"
    },
    {
        id: 22,
        title: "PORTRAIT SERIES 01",
        description: "Portrait photography, 2024",
        category: "photography",
        imagePath: "images/photography_portrait_1.jpg"
    },
    {
        id: 23,
        title: "PORTRAIT SERIES 02",
        description: "Portrait photography, 2024",
        category: "photography",
        imagePath: "images/photography_portrait_2.jpg"
    },
    {
        id: 24,
        title: "PORTRAIT SERIES 03",
        description: "Portrait photography, 2024",
        category: "photography",
        imagePath: "images/photography_portrait_3.jpg"
    },
    {
        id: 25,
        title: "PORTRAIT SERIES 04",
        description: "Portrait photography, 2024",
        category: "photography",
        imagePath: "images/photography_portrait_4.jpg"
    },
    {
        id: 26,
        title: "PORTRAIT SERIES 05",
        description: "Portrait photography, 2024",
        category: "photography",
        imagePath: "images/photography_portrait_5.jpg"
    },
    {
        id: 27,
        title: "THE QUIET END OF EROS",
        description: "Oil on canvas, 2017",
        category: "painting",
        imagePath: "images/painting_1.jpg"
    },
    {
        id: 28,
        title: "OUTGOING",
        description: "Oil on canvas, 2015", 
        category: "painting",
        imagePath: "images/painting_2.jpg"
    },
    {
        id: 29,
        title: "IF TEARS HAD A VOICE",
        description: "Oil on canvas, 2019",
        category: "painting",
        imagePath: "images/painting_3.jpg"
    },
    {
        id: 30,
        title: "IN THE WAKE OF THE WARMTH",
        description: "Oil on canvas, 2021",
        category: "painting",
        imagePath: "images/painting_4.jpg"
    },
    {
        id: 31,
        title: "PORTRAIT STUDY 01",
        description: "Digital painting, 2023",
        category: "painting",
        imagePath: "images/painting_digital_1.jpg"
    },
    {
        id: 32,
        title: "PORTRAIT STUDY 02",
        description: "Digital painting, 2023",
        category: "painting",
        imagePath: "images/painting_digital_2.jpg"
    },
    {
        id: 33,
        title: "PORTRAIT STUDY 03",
        description: "Digital painting, 2023",
        category: "painting",
        imagePath: "images/painting_digital_3.jpg"
    },
    {
        id: 34,
        title: "LINES IN MOTION 01",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_5.jpg"
    },
    {
        id: 35,
        title: "LINES IN MOTION 02",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_6.jpg"
    },
    {
        id: 36,
        title: "ECHOES OF FORM 01",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_7.jpg"
    },
    {
        id: 37,
        title: "ECHOES OF FORM 02",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_8.jpg"
    },
    {
        id: 38,
        title: "RETRO CITYSCAPE 01",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_cityscape_1.jpg"
    },
    {
        id: 39,
        title: "RETRO CITYSCAPE 02",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_cityscape_2.jpg"
    },
    {
        id: 40,
        title: "CHAOTIC CONTOUR 01",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_contour_1.jpg"
    },
    {
        id: 41,
        title: "CHAOTIC CONTOUR 02",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_contour_2.jpg"
    },
    {
        id: 42,
        title: "ECHOES OF FORM 03",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_9.jpg"
    },
    {
        id: 43,
        title: "RETRO POP 01",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_pop_1.jpg"
    },
    {
        id: 44,
        title: "RETRO POP 02",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_pop_2.jpg"
    },
    {
        id: 45,
        title: "ECHOES OF FORM 04",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_form_1.jpg"
    },
    {
        id: 46,
        title: "ECHOES OF FORM 05",
        description: "GPT-4o, 2025",
        category: "generative",
        imagePath: "images/generative_form_2.jpg"
    },
]; 