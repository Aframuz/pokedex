$(function () {
   $("form").submit(function (event) {
      event.preventDefault()

      const pokeNumber = $("#pokeNumber").val()

      $.ajax({
         url: `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`,
         success: (data) => {
            const pokeName = data.name
            const pokeImg = data.sprites.front_default
            const pokeWeight = data.weight
            const stats = []

            data.stats.forEach((stat) => {
               stats.push({
                  label: stat.stat.name,
                  y: stat.base_stat,
               })
            })

            $("#poke-info > h2").text(pokeName)
            $("#poke-info > img").attr({ src: pokeImg, alt: pokeName })
            $("#poke-info > span").text(`Peso: ${pokeWeight} [Kg]`)

            const config = {
               animationEnabled: true,
               title: {
                  text: "Estadísticas",
               },
               axisY: {
                  title: "",
               },
               axisX: {
                  title: "",
               },
               data: [
                  {
                     type: "column",
                     dataPoints: stats,
                  },
               ],
            }

            const chart = new CanvasJS.Chart("pokeStats", config)
            chart.render()
         },
      })
   })
})
