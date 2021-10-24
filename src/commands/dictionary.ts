"use strict";

import axios from "axios";
import { MessageEmbed } from "discord.js";
import ButtonPaginator from "../methods/ButtonPaginator";

async function run(options: any, interaction: any) {
  const word = options.getString("word")!;

  // console.log(word);

  const url = `https://api.dictionaryapi.dev/api/v1/entries/en/${word}`;

  axios
    .get(url)
    .then(async (response) => {
      let data = response.data;
      let status: number = response.status;

      // let dictEmbed: any;
      let pages: any = [];

      if (status === 404) {
        return;
      } else {
        if (data.length > 1) {
          let pageNo: number = 0;
          let embed: any;

          // let datum = data[0];

          data.forEach((datum: any) => {
            pageNo++;

            let phonetic: any = datum.phonetic ? datum.phonetic : "Unknown";

            let origin: any = datum.origin ? datum.origin : "Unknown";

            let noun: any = datum.meaning.noun
              ? datum.meaning.noun[0].definition
              : "Unknown";
            let pronoun: any = datum.meaning.pronoun
              ? datum.meaning.pronoun[0].definition
              : "Unknown";
            let verb: any = datum.meaning.verb
              ? datum.meaning.verb[0].definition
              : "Unknown";
            let adjective: any = datum.meaning.adjective
              ? datum.meaning.adjective[0].definition
              : "Unknown";
            let adverb: any = datum.meaning.adverb
              ? datum.meaning.adverb[0].definition
              : "Unknown";
            let preposition: any = datum.meaning.preposition
              ? datum.meaning.preposition[0].definition
              : "Unknown";
            let conjunction: any = datum.meaning.conjunction
              ? datum.meaning.conjunction[0].definition
              : "Unknown";
            let interjection: any = datum.meaning.interjection
              ? datum.meaning.interjection[0].definition
              : "Unknown";
            let exclamation: any = datum.meaning.exclamation
              ? datum.meaning.exclamation[0].definition
              : "Unknown";
            let determiner: any = datum.meaning.determiner
              ? datum.meaning.determiner[0].definition
              : "Unknown";
            let abbreviation: any = datum.meaning.abbreviation
              ? datum.meaning.abbreviation[0].definition
              : "Unknown";
            let undefined: any = datum.meaning.undefined
              ? datum.meaning.undefined[0].definition
              : "Unknown";

            embed = new MessageEmbed()
              .setColor("#777cc3")
              .setTitle(`Definition for "${datum.word}"`)
              .addFields([
                {
                  name: "Phonetic",
                  value: phonetic,
                },
                {
                  name: "Origin",
                  value: origin,
                },
                {
                  name: "Definition as a Noun",
                  value: noun,
                },
                {
                  name: "Definition as a Pronoun",
                  value: pronoun,
                },
                {
                  name: "Definition as a Verb",
                  value: verb,
                },
                {
                  name: "Definition as an Adjective",
                  value: adjective,
                },
                {
                  name: "Definition as an Adverb",
                  value: adverb,
                },
                {
                  name: "Definition as a Preposition",
                  value: preposition,
                },
                {
                  name: "Definition as a Conjunction",
                  value: conjunction,
                },
                {
                  name: "Definition as an Interjection",
                  value: interjection,
                },
                {
                  name: "Definition as an Exclamation",
                  value: exclamation,
                },
                {
                  name: "Definition as a Determiner",
                  value: determiner,
                },
                {
                  name: "Definition as a Abbreviation",
                  value: abbreviation,
                },
                {
                  name: "Definition as a Miscellaneous",
                  value: undefined,
                },
              ])
              .setFooter(`Dictionary | Page ${pageNo} of ${data.length}`)
              .setTimestamp();

            pages.push(embed);
          });

          ButtonPaginator(interaction, pages);
        } else {
          const datum = data[0];

          let phonetic: any = datum.phonetic ? datum.phonetic : "Unknown";

          let origin: any = datum.origin ? datum.origin : "Unknown";

          let noun: any = datum.meaning.noun
            ? datum.meaning.noun[0].definition
            : "Unknown";
          let pronoun: any = datum.meaning.pronoun
            ? datum.meaning.pronoun[0].definition
            : "Unknown";
          let verb: any = datum.meaning.verb
            ? datum.meaning.verb[0].definition
            : "Unknown";
          let adjective: any = datum.meaning.adjective
            ? datum.meaning.adjective[0].definition
            : "Unknown";
          let adverb: any = datum.meaning.adverb
            ? datum.meaning.adverb[0].definition
            : "Unknown";
          let preposition: any = datum.meaning.preposition
            ? datum.meaning.preposition[0].definition
            : "Unknown";
          let conjunction: any = datum.meaning.conjunction
            ? datum.meaning.conjunction[0].definition
            : "Unknown";
          let interjection: any = datum.meaning.interjection
            ? datum.meaning.interjection[0].definition
            : "Unknown";
          let exclamation: any = datum.meaning.exclamation
            ? datum.meaning.exclamation[0].definition
            : "Unknown";
          let determiner: any = datum.meaning.determiner
            ? datum.meaning.determiner[0].definition
            : "Unknown";
          let abbreviation: any = datum.meaning.abbreviation
            ? datum.meaning.abbreviation[0].definition
            : "Unknown";
          let undefined: any = datum.meaning.undefined
            ? datum.meaning.undefined[0].definition
            : "Unknown";

          const embed = new MessageEmbed()
            .setColor("#777cc3")
            .setTitle(`Definition for "${datum.word}"`)
            .addFields([
              {
                name: "Phonetic",
                value: phonetic,
              },
              {
                name: "Origin",
                value: origin,
              },
              {
                name: "Definition as a Noun",
                value: noun,
              },
              {
                name: "Definition as a Pronoun",
                value: pronoun,
              },
              {
                name: "Definition as a Verb",
                value: verb,
              },
              {
                name: "Definition as an Adjective",
                value: adjective,
              },
              {
                name: "Definition as an Adverb",
                value: adverb,
              },
              {
                name: "Definition as a Preposition",
                value: preposition,
              },
              {
                name: "Definition as a Conjunction",
                value: conjunction,
              },
              {
                name: "Definition as an Interjection",
                value: interjection,
              },
              {
                name: "Definition as an Exclamation",
                value: exclamation,
              },
              {
                name: "Definition as a Determiner",
                value: determiner,
              },
              {
                name: "Definition as a Abbreviation",
                value: abbreviation,
              },
              {
                name: "Definition as a Miscellaneous",
                value: undefined,
              },
            ])
            .setFooter(`Dictionary | Page 1 of 1`)
            .setTimestamp();

          interaction.editReply({
            embeds: [embed],
            ephemeral: false,
          });
        }

        // data.forEach(async (data: any) => {
        // phonetic = data.phonetic;
        // origin = data.origin;

        // definition_noun = data.meaning.noun;
        // definition_verb = data.meaning.verb;
        // definition_adjective = data.meaning.adjective;

        // let noun_definition: any;
        // let noun_example: any;

        // dictEmbed = new MessageEmbed()
        //   .setColor("#777cc3")
        //   .setTitle(`Definition for "${data.word}"`)
        //   .addFields([
        //     {
        //       name: "Phonetic",
        //       value: data.phonetic,
        //     },
        //     {
        //       name: "Origin",
        //       value: data.origin,
        //     },
        //     {
        //       name: "Definition as a Noun",
        //       value:
        //         data.meaning.noun !== null
        //           ? data.meaning.noun[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as a Pronoun",
        //       value:
        //         data.meaning.pronoun !== null
        //           ? data.meaning.pronoun[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as a Verb",
        //       value:
        //         data.meaning.verb !== null
        //           ? data.meaning.verb[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as an Adjective",
        //       value:
        //         data.meaning.adjective !== null
        //           ? data.meaning.adjective[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as an Adverb",
        //       value:
        //         data.meaning.adverb !== null
        //           ? data.meaning.adverb[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as a Preposition",
        //       value:
        //         data.meaning.preposition !== null
        //           ? data.meaning.preposition[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as a Conjunction",
        //       value:
        //         data.meaning.conjunction !== null
        //           ? data.meaning.conjunction[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as an Interjection",
        //       value:
        //         data.meaning.interjection !== null
        //           ? data.meaning.interjection[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as an Exclamation",
        //       value:
        //         data.meaning.exclamation !== null
        //           ? data.meaning.exclamation[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as a Determiner",
        //       value:
        //         data.meaning.determiner !== null
        //           ? data.meaning.determiner[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //     {
        //       name: "Definition as a Abbreviation",
        //       value:
        //         data.meaning.abbreviation !== null
        //           ? data.meaning.abbreviation[0].definition
        //           : // .forEach((element: any) => {
        //             //     return element.definition;
        //             //   })
        //             "None",
        //     },
        //   ])
        //   .setFooter("Dictionary")
        //   .setTimestamp();

        // await interaction.deferReply({
        //   ephemeral: false,
        // });

        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // await interaction.editReply({
        //   embeds: [dictEmbed],
        // });

        // console.log("Gave a round");
        // });
      }
    })
    .catch((err) => {
      const errorEmbed = new MessageEmbed()
        .setColor("#c64340")
        .setTitle("Error")
        .setDescription(`No definition found for **${word}**`)
        .setFooter("Dictionary | Error")
        .setTimestamp();

      interaction.editReply({
        embeds: [errorEmbed],
        ephemeral: false,
      });
      return;
    });
}

export default {
  name: "Dictionary Lookup",
  description: "Look up a word in a dictionary.",
  usage: "/u_dictionary <word>",
  type: "utility",
  run,
};
