import axios from "axios";
import { MessageEmbed } from "discord.js";

function run(options: any, interaction: any) {
  const elementName = options.getString("element_name")!;

  const url = `https://periodic-table-api.herokuapp.com/atomicName/${elementName}`;

  axios.get(url).then((response) => {
    const data = response.data;

    if (data.status === false) {
      interaction.editReply({
        content: `**I don't think there's an element named "${elementName}"!**`,
      });
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`Info for the element: **${data.name}, ${data.symbol}**`)
      .addFields([
        {
          name: "Atomic Number",
          value: data.atomicNumber,
        },
        {
          name: "Atomic Mass",
          value: data.atomicMass,
        },
        {
          name: "Group Name",
          value: data.groupBlock
            .trim()
            .toLowerCase()
            .replace(/\w\S*/g, (w: string) =>
              w.replace(/^\w/, (c) => c.toUpperCase())
            ),
        },
        {
          name: "State at Room Temperature",
          value: data.standardState
            .trim()
            .toLowerCase()
            .replace(/\w\S*/g, (w: string) =>
              w.replace(/^\w/, (c) => c.toUpperCase())
            ),
        },
        {
          name: "Melting Point",
          value: `${data.meltingPoint}°C`,
        },
        {
          name: "Boiling Point",
          value: `${data.boilingPoint}°C`,
        },
        {
          name: "Bonding type",
          value: data.bondingType
            .trim()
            .toLowerCase()
            .replace(/\w\S*/g, (w: string) =>
              w.replace(/^\w/, (c) => c.toUpperCase())
            ),
        },
      ])
      .setColor(`#${data.cpkHexColor.toLowerCase()}`)
      .setFooter("Periodic Table")
      .setTimestamp();

    interaction.editReply({
      embeds: [embed],
      ephemeral: false,
    });
  });
}

export default {
  name: "Periodic Table Element Lookup",
  description: "Look up an element from the Periodic Table.",
  usage: "/u_periodic <element_name>",
  type: "utility",
  run,
};
