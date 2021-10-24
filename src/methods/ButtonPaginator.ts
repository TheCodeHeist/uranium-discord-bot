import ms from "ms";
import { MessageButton, MessageActionRow } from "discord.js";

export default async function ButtonPaginator(interaction: any, pages: any) {
  let page = 0;

  const btnPrev = new MessageButton()
    .setEmoji("⬅️")
    .setCustomId("prev")
    .setStyle("SUCCESS");
  const btnNext = new MessageButton()
    .setEmoji("➡️")
    .setCustomId("next")
    .setStyle("SUCCESS");
  const btnRow = new MessageActionRow().addComponents(btnPrev, btnNext);

  const btnPrevDead = new MessageButton()
    .setEmoji("⬅️")
    .setCustomId("1111")
    .setStyle("SUCCESS")
    .setDisabled();
  const btnNextDead = new MessageButton()
    .setEmoji("➡️")
    .setCustomId("0000")
    .setStyle("SUCCESS")
    .setDisabled();
  const btnRowDead = new MessageActionRow().addComponents(
    btnPrevDead,
    btnNextDead
  );

  const currentPage = await interaction.editReply({
    embeds: [pages[0]],
    components: [btnRow],
  });

  const filter = (btn: any) => ["prev", "next"].includes(btn.customId);

  const col = await currentPage.channel.createMessageComponentCollector(
    filter,
    {
      time: 1000,
    }
  );

  col.on("collect", async (i: any) => {
    // await i.deferUpdate();
    // console.log(i);

    if (i.customId === "prev") {
      page = page > 0 ? --page : pages.length - 1;
    } else if (i.customId === "next") {
      page = page + 1 < pages.length ? ++page : 0;
    }

    await i.update({
      embeds: [pages[page]],
      components: [btnRow],
    });
  });

  col.on("end", async () => {
    if (!currentPage.deleted) {
      currentPage.editReply({
        embeds: [pages[page]],
        components: [btnRowDead],
      });
    }
  });

  return currentPage;
}
