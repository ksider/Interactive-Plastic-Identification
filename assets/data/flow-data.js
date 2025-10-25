const flow = {
      start: {
        type: 'question',
        title: {
          ru: 'Пластиковый материал',
          en: 'Plastic Material'
        },
        text: {
          ru: 'Прижмите к образцу нагретый металлический наконечник. Размягчается ли материал?',
          en: 'Press a heated metal tip against the sample. Does the material soften?'
        },
        options: [
          {
            label: {
              ru: 'Да, размягчается',
              en: 'Yes, it softens'
            },
            note: {
              ru: 'Термопласт',
              en: 'Thermoplastic'
            },
            next: 'thermoplastic_water'
          },
          {
            label: {
              ru: 'Нет, не размягчается',
              en: 'No, it does not soften'
            },
            note: {
              ru: 'Термореактивный пластик',
              en: 'Thermosetting plastic'
            },
            next: 'thermoset_burn'
          }
        ]
      },
      thermoplastic_water: {
        type: 'question',
        title: {
          ru: 'Термопласт',
          en: 'Thermoplastic'
        },
        text: {
          ru: 'Бросьте маленький образец в воду. Он плавает или тонет?',
          en: 'Drop a small sample into water. Does it float or sink?'
        },
        description: {
          ru: 'Этот шаг разделяет полиолефины (обычно легче воды) и остальные термопласты.',
          en: 'This separates lighter-than-water polyolefins from other thermoplastics.'
        },
        options: [
          {
            label: {
              ru: 'Плавает',
              en: 'Floats'
            },
            note: {
              ru: 'Полиолефины',
              en: 'Polyolefins'
            },
            next: 'polyolefins_smell'
          },
          {
            label: {
              ru: 'Тонет',
              en: 'Sinks'
            },
            note: {
              ru: 'Другие термопласты',
              en: 'All other thermoplastics'
            },
            next: 'thermoplastic_burn_flame'
          }
        ]
      },
      polyolefins_smell: {
        type: 'question',
        title: {
          ru: 'Полиолефины',
          en: 'Polyolefins'
        },
        text: {
          ru: 'При сжигании небольшого образца какой запах вы ощущаете?',
          en: 'When burning a small sample, what odour do you notice?'
        },
        description: {
          ru: 'Полиэтилен, полипропилен и TPX дают схожее пламя, поэтому запах и внешний вид образца помогают их отличить.',
          en: 'Polyethylene, polypropylene, and TPX show similar flames, so odour and specimen appearance help tell them apart.'
        },
        options: [
          {
            label: {
              ru: 'Парафин, тёплый запах свечи',
              en: 'Paraffin, warm candle smell'
            },
            next: 'pe'
          },
          {
            label: {
              ru: 'Едкий, похож на дизельное топливо',
              en: 'Acrid, like diesel fumes'
            },
            next: 'pp'
          },
          {
            label: {
              ru: 'Запаха почти нет, образец абсолютно прозрачный',
              en: 'Hardly any smell, sample is completely clear'
            },
            next: 'tpx'
          }
        ]
      },
      pe: {
        type: 'result',
        title: {
          ru: 'Полиэтилен (PE)',
          en: 'Polyethylene (PE)'
        },
        description: {
          ru: 'Типичный представитель плавающих полиолефинов.',
          en: 'Representative of floating polyolefins.'
        },
        materials: [
          {
            name: {
              ru: 'Полиэтилен (PE)',
              en: 'Polyethylene (PE)'
            },
            flame: {
              ru: 'Синее пламя с жёлтым кончиком',
              en: 'Blue flame with yellow tip'
            },
            odour: {
              ru: 'Парафин, свеча',
              en: 'Paraffin, candle-like'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Легко царапается ногтем',
              en: 'Scratches easily with a fingernail'
            }
          }
        ]
      },
      pp: {
        type: 'result',
        title: {
          ru: 'Полипропилен (PP)',
          en: 'Polypropylene (PP)'
        },
        description: {
          ru: 'Плотность чуть меньше единицы, поэтому образец плавает.',
          en: 'Density is slightly below water, so the sample floats.'
        },
        materials: [
          {
            name: {
              ru: 'Полипропилен (PP)',
              en: 'Polypropylene (PP)'
            },
            flame: {
              ru: 'Синее пламя с жёлтым кончиком',
              en: 'Blue flame with yellow tip'
            },
            odour: {
              ru: 'Едкий, дизельный',
              en: 'Acrid, diesel-like'
            },
            speed: {
              ru: 'Медленно',
              en: 'Slow'
            },
            other: {
              ru: 'Не царапается ногтем',
              en: 'Does not scratch with a fingernail'
            }
          }
        ]
      },
      tpx: {
        type: 'result',
        title: {
          ru: 'Полиметилпентен (TPX)',
          en: 'Polymethylpentene (TPX)'
        },
        description: {
          ru: 'Прозрачный полиолефин с очень низкой плотностью.',
          en: 'Transparent polyolefin with very low density.'
        },
        materials: [
          {
            name: {
              ru: 'Polymethylpentene (TPX)',
              en: 'Polymethylpentene (TPX)'
            },
            flame: {
              ru: 'Синее пламя',
              en: 'Blue flame'
            },
            odour: {
              ru: 'Практически отсутствует',
              en: 'Almost odourless'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Прозрачный «стеклянный» вид',
              en: 'Crystal-clear “glassy” appearance'
            }
          }
        ]
      },
      thermoplastic_burn_flame: {
        type: 'question',
        title: {
          ru: 'Другие термопласты',
          en: 'Other Thermoplastics'
        },
        text: {
          ru: 'При поджигании образца появляется пламя?',
          en: 'Does the sample produce a flame when ignited?'
        },
        description: {
          ru: 'Наблюдение за пламенем помогает отделить фторполимеры от остальных материалов.',
          en: 'Flame behaviour separates fluoropolymers from other materials.'
        },
        options: [
          {
            label: {
              ru: 'Нет, пламени нет',
              en: 'No flame appears'
            },
            next: 'no_flames_drips'
          },
          {
            label: {
              ru: 'Да, пламя есть',
              en: 'Yes, a flame appears'
            },
            next: 'flame_present'
          }
        ]
      },
      no_flames_drips: {
        type: 'question',
        title: {
          ru: 'Без пламени',
          en: 'No Flame'
        },
        text: {
          ru: 'Материал плавится и образует мягкие капли или нити?',
          en: 'Does the material melt and form soft drips or strings?'
        },
        description: {
          ru: 'Даже если пламени нет, поведение расплава подсказывает, какой именно фторполимер перед вами.',
          en: 'Even without a flame, melt behaviour hints at the specific fluoropolymer.'
        },
        options: [
          {
            label: {
              ru: 'Да, образуются капли или нити',
              en: 'Yes, drips or strings form'
            },
            next: 'ctfe'
          },
          {
            label: {
              ru: 'Нет, материал почти не меняет форму',
              en: 'No, the shape barely changes'
            },
            next: 'fluoro_polymers'
          }
        ]
      },
      ctfe: {
        type: 'result',
        title: {
          ru: 'Полихлортрифторэтилен (CTFE)',
          en: 'Polychlorotrifluoroethylene (CTFE)'
        },
        description: {
          ru: 'Не поддерживает горение и даёт вязкий расплав.',
          en: 'Does not sustain burning and yields a viscous melt.'
        },
        materials: [
          {
            name: {
              ru: 'CTFE',
              en: 'CTFE'
            },
            flame: {
              ru: 'Не горит',
              en: 'Does not burn'
            },
            odour: {
              ru: 'Отсутствует',
              en: 'None'
            },
            speed: {
              ru: 'Не горит',
              en: 'Does not burn'
            },
            other: {
              ru: 'При нагреве образует вязкие нити',
              en: 'Forms viscous strands when heated'
            }
          }
        ]
      },
      fluoro_polymers: {
        type: 'result',
        title: {
          ru: 'Фторполимеры (PTFE, FEP и др.)',
          en: 'Fluoropolymers (PTFE, FEP, etc.)'
        },
        description: {
          ru: 'Материал не поддерживает пламя и практически не плавится.',
          en: 'Does not sustain flame and barely melts.'
        },
        materials: [
          {
            name: {
              ru: 'PTFE / FEP / другие фторполимеры',
              en: 'PTFE / FEP / other fluoropolymers'
            },
            flame: {
              ru: 'Не горит',
              en: 'Does not burn'
            },
            odour: {
              ru: 'Отсутствует',
              en: 'None'
            },
            speed: {
              ru: 'Не горит',
              en: 'Does not burn'
            },
            other: {
              ru: 'Сохраняет форму, уголь не образуется',
              en: 'Keeps shape, little to no charring'
            }
          }
        ]
      }
      ,
      flame_present: {
        type: 'question',
        title: {
          ru: 'Есть пламя',
          en: 'Flame Present'
        },
        text: {
          ru: 'После удаления источника огня образец сам гаснет?',
          en: 'Does the sample self-extinguish once the flame is removed?'
        },
        description: {
          ru: 'Так мы отделяем самозатухающие материалы от тех, что продолжают гореть.',
          en: 'This separates self-extinguishing materials from those that keep burning.'
        },
        options: [
          {
            label: {
              ru: 'Нет, продолжает гореть',
              en: 'No, it keeps burning'
            },
            next: 'continues_drips'
          },
          {
            label: {
              ru: 'Да, самозатухает',
              en: 'Yes, it self-extinguishes'
            },
            next: 'self_ext_drips'
          }
        ]
      },
      continues_drips: {
        type: 'question',
        title: {
          ru: 'Продолжает гореть',
          en: 'Continues Burning'
        },
        text: {
          ru: 'Во время горения образуются капли расплава?',
          en: 'Does it form dripping melt while burning?'
        },
        options: [
          {
            label: {
              ru: 'Да, капли появляются',
              en: 'Yes, drips appear'
            },
            next: 'continues_drips_yes'
          },
          {
            label: {
              ru: 'Нет, капли не падают',
              en: 'No, no drips'
            },
            next: 'continues_drips_no'
          }
        ]
      },
      continues_drips_yes: {
        type: 'question',
        title: {
          ru: 'Капли при горении',
          en: 'Drips While Burning'
        },
        text: {
          ru: 'Как описать запах дыма?',
          en: 'How would you describe the smoke odour?'
        },
        options: [
          {
            label: {
              ru: 'Чистый запах стирола',
              en: 'Pure styrene smell'
            },
            next: 'ps'
          },
          {
            label: {
              ru: 'Стирол и резина',
              en: 'Styrene with rubber notes'
            },
            next: 'hips_san'
          },
          {
            label: {
              ru: 'Горький, резиновый запах',
              en: 'Bitter, rubbery smell'
            },
            next: 'abs'
          }
        ]
      },
      ps: {
        type: 'result',
        title: {
          ru: 'Полистирол (PS)',
          en: 'Polystyrene (PS)'
        },
        materials: [
          {
            name: {
              ru: 'Полистирол (PS)',
              en: 'Polystyrene (PS)'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Стирол',
              en: 'Styrene'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Густой дым с сажей',
              en: 'Dense smoke with soot'
            }
          }
        ]
      },
      hips_san: {
        type: 'result',
        title: {
          ru: 'Ударопрочный полистирол / SAN',
          en: 'High-impact PS / SAN'
        },
        description: {
          ru: 'Оба материала дают смесь запахов стирола и резины.',
          en: 'Both release a mix of styrene and rubber odours.'
        },
        materials: [
          {
            name: {
              ru: 'HIPS (ударопрочный полистирол)',
              en: 'HIPS (high-impact polystyrene)'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Стирол и резина',
              en: 'Styrene and rubber'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            }
          },
          {
            name: {
              ru: 'SAN (сополимер стирола и акрилонитрила)',
              en: 'SAN (styrene-acrylonitrile)'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Стирол и резина',
              en: 'Styrene and rubber'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            }
          }
        ]
      },
      abs: {
        type: 'result',
        title: {
          ru: 'АБС-пластик (ABS)',
          en: 'ABS Plastic'
        },
        materials: [
          {
            name: {
              ru: 'ABS',
              en: 'ABS'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Горький, резиновый',
              en: 'Bitter, rubbery'
            },
            speed: {
              ru: 'Медленно',
              en: 'Slow'
            },
            other: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            }
          }
        ]
      },
      continues_drips_no: {
        type: 'question',
        title: {
          ru: 'Без капель',
          en: 'No Dripping'
        },
        text: {
          ru: 'Появляется ли дым при горении?',
          en: 'Is smoke produced while burning?'
        },
        options: [
          {
            label: {
              ru: 'Нет, дым почти отсутствует',
              en: 'No, almost no smoke'
            },
            next: 'no_smoke_speed'
          },
          {
            label: {
              ru: 'Да, заметен дым с сажей',
              en: 'Yes, noticeable sooty smoke'
            },
            next: 'smoke_odour'
          }
        ]
      },
      no_smoke_speed: {
        type: 'question',
        title: {
          ru: 'Без дыма',
          en: 'No Smoke'
        },
        text: {
          ru: 'Как быстро горит образец?',
          en: 'How quickly does the sample burn?'
        },
        options: [
          {
            label: {
              ru: 'Быстро',
              en: 'Fast'
            },
            next: 'pmma'
          },
          {
            label: {
              ru: 'Медленно',
              en: 'Slow'
            },
            next: 'pom'
          }
        ]
      },
      pmma: {
        type: 'result',
        title: {
          ru: 'Акрил (PMMA)',
          en: 'Acrylic (PMMA)'
        },
        materials: [
          {
            name: {
              ru: 'Полиметилметакрилат (PMMA)',
              en: 'Polymethyl methacrylate (PMMA)'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Метилированные спирты',
              en: 'Methylated spirits'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Практически без дыма',
              en: 'Almost no smoke'
            }
          }
        ]
      },
      pom: {
        type: 'result',
        title: {
          ru: 'Полиоксиметилен (POM)',
          en: 'Polyoxymethylene (POM)'
        },
        materials: [
          {
            name: {
              ru: 'POM (ацеталь)',
              en: 'POM (acetal)'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Формальдегид',
              en: 'Formaldehyde'
            },
            speed: {
              ru: 'Медленно',
              en: 'Slow'
            },
            other: {
              ru: 'Практически без дыма',
              en: 'Almost no smoke'
            }
          }
        ]
      },
      smoke_odour: {
        type: 'question',
        title: {
          ru: 'Дым с сажей',
          en: 'Sooty Smoke'
        },
        text: {
          ru: 'Какой запах ощущается?',
          en: 'What odour do you notice?'
        },
        options: [
          {
            label: {
              ru: 'Уксус или уксусный ангидрид',
              en: 'Vinegar or acetic anhydride'
            },
            next: 'cellulosics'
          },
          {
            label: {
              ru: 'Горящая резина',
              en: 'Burning rubber'
            },
            next: 'pet'
          }
        ]
      },
      cellulosics: {
        type: 'result',
        title: {
          ru: 'Целлулоидные пластики',
          en: 'Cellulosic Plastics'
        },
        materials: [
          {
            name: {
              ru: 'Целлулоид / другие целлюлозные пластики',
              en: 'Celluloid / other cellulosic plastics'
            },
            flame: {
              ru: 'Жёлтое пламя с искрами',
              en: 'Yellow flame with sparks'
            },
            odour: {
              ru: 'Уксус',
              en: 'Vinegar'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Лёгкий чёрный дым с сажей',
              en: 'Light black smoke with soot'
            }
          }
        ]
      },
      pet: {
        type: 'result',
        title: {
          ru: 'Полиэтилентерефталат (PET)',
          en: 'Polyethylene terephthalate (PET)'
        },
        materials: [
          {
            name: {
              ru: 'PET',
              en: 'PET'
            },
            flame: {
              ru: 'Жёлтое пламя с голубыми краями',
              en: 'Yellow flame with blue edges'
            },
            odour: {
              ru: 'Горящая резина',
              en: 'Burning rubber'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            }
          }
        ]
      }
      ,
      self_ext_drips: {
        type: 'question',
        title: {
          ru: 'Самозатухающие термопласты',
          en: 'Self-extinguishing Thermoplastics'
        },
        text: {
          ru: 'Во время горения образуются капли расплава?',
          en: 'Do dripping melts appear while burning?'
        },
        options: [
          {
            label: {
              ru: 'Да, появляются',
              en: 'Yes, there are drips'
            },
            next: 'self_ext_drip_smell'
          },
          {
            label: {
              ru: 'Нет, капель нет',
              en: 'No drips'
            },
            next: 'self_ext_no_drips_odour'
          }
        ]
      },
      self_ext_drip_smell: {
        type: 'question',
        title: {
          ru: 'Капли у самозатухающего материала',
          en: 'Dripping, Self-extinguishing'
        },
        text: {
          ru: 'Как пахнет дым?',
          en: 'How does the smoke smell?'
        },
        options: [
          {
            label: {
              ru: 'Прожжённые волосы или шерсть',
              en: 'Burnt hair or wool'
            },
            next: 'nylon'
          },
          {
            label: {
              ru: 'Сладковатый химический запах',
              en: 'Sweet chemical smell'
            },
            next: 'tpu'
          }
        ]
      },
      nylon: {
        type: 'result',
        title: {
          ru: 'Полиамид (нейлон)',
          en: 'Polyamide (Nylon)'
        },
        materials: [
          {
            name: {
              ru: 'Нейлон (PA)',
              en: 'Nylon (PA)'
            },
            flame: {
              ru: 'Жёлтое пламя с голубым кончиком',
              en: 'Yellow flame with blue tip'
            },
            odour: {
              ru: 'Прожжённые волосы',
              en: 'Burnt hair'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Образует капли расплава',
              en: 'Forms dripping melt'
            }
          }
        ]
      },
      tpu: {
        type: 'result',
        title: {
          ru: 'Термопластичные полиуретаны (TPU)',
          en: 'Thermoplastic Polyurethanes (TPU)'
        },
        materials: [
          {
            name: {
              ru: 'TPU',
              en: 'TPU'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Сладковатый химический запах',
              en: 'Sweet chemical smell'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Пузыри по фронту пламени',
              en: 'Bubbling at the flame front'
            }
          }
        ]
      },
      self_ext_no_drips_odour: {
        type: 'question',
        title: {
          ru: 'Без капель',
          en: 'No Drips'
        },
        text: {
          ru: 'Какой запах ощущается?',
          en: 'What odour do you notice?'
        },
        options: [
          {
            label: {
              ru: 'Запах серы',
              en: 'Sulphur smell'
            },
            next: 'polysulphone'
          },
          {
            label: {
              ru: 'Запах фенола',
              en: 'Phenolic smell'
            },
            next: 'phenol_branch'
          },
          {
            label: {
              ru: 'Едкий запах соляной кислоты',
              en: 'Sharp hydrochloric acid smell'
            },
            next: 'pvc'
          }
        ]
      },
      polysulphone: {
        type: 'result',
        title: {
          ru: 'Полисульфон (PSU)',
          en: 'Polysulfone (PSU)'
        },
        materials: [
          {
            name: {
              ru: 'Полисульфон (PSU)',
              en: 'Polysulfone (PSU)'
            },
            flame: {
              ru: 'Оранжевое пламя',
              en: 'Orange flame'
            },
            odour: {
              ru: 'Запах серы',
              en: 'Sulphur odour'
            },
            speed: {
              ru: 'Быстро',
              en: 'Fast'
            },
            other: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            }
          }
        ]
      },
      phenol_branch: {
        type: 'question',
        title: {
          ru: 'Запах фенола',
          en: 'Phenolic Odour'
        },
        text: {
          ru: 'Обратите внимание на дополнительные признаки.',
          en: 'Look for additional signs.'
        },
        options: [
          {
            label: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            },
            next: 'polycarbonate'
          },
          {
            label: {
              ru: 'Материал трудно воспламенить',
              en: 'Hard to ignite'
            },
            next: 'ppe'
          }
        ]
      },
      polycarbonate: {
        type: 'result',
        title: {
          ru: 'Поликарбонат (PC)',
          en: 'Polycarbonate (PC)'
        },
        materials: [
          {
            name: {
              ru: 'Поликарбонат (PC)',
              en: 'Polycarbonate (PC)'
            },
            flame: {
              ru: 'Оранжево-жёлтое пламя',
              en: 'Orange-yellow flame'
            },
            odour: {
              ru: 'Фенол',
              en: 'Phenol'
            },
            speed: {
              ru: 'Медленно',
              en: 'Slow'
            },
            other: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            }
          }
        ]
      },
      ppe: {
        type: 'result',
        title: {
          ru: 'Полифениленовый эфир (PPE)',
          en: 'Polyphenylene Ether (PPE)'
        },
        materials: [
          {
            name: {
              ru: 'PPE',
              en: 'PPE'
            },
            flame: {
              ru: 'Оранжево-жёлтое пламя',
              en: 'Orange-yellow flame'
            },
            odour: {
              ru: 'Фенол',
              en: 'Phenol'
            },
            speed: {
              ru: 'Медленно',
              en: 'Slow'
            },
            other: {
              ru: 'Очень трудно воспламенить',
              en: 'Difficult to ignite'
            }
          }
        ]
      },
      pvc: {
        type: 'result',
        title: {
          ru: 'Поливинилхлорид (PVC)',
          en: 'Polyvinyl Chloride (PVC)'
        },
        materials: [
          {
            name: {
              ru: 'PVC',
              en: 'PVC'
            },
            flame: {
              ru: 'Жёлтое пламя с зеленоватыми краями',
              en: 'Yellow flame with green edges'
            },
            odour: {
              ru: 'Соляная кислота',
              en: 'Hydrochloric acid'
            },
            speed: {
              ru: 'Медленно',
              en: 'Slow'
            },
            other: {
              ru: 'Белый едкий дым, самозатухает',
              en: 'White acrid smoke, self-extinguishes'
            }
          }
        ]
      },
      thermoset_burn: {
        type: 'question',
        title: {
          ru: 'Термореактивный пластик',
          en: 'Thermosetting Plastic'
        },
        text: {
          ru: 'При сжигании небольшого образца он самозатухает или продолжает гореть?',
          en: 'When burning a small sample, does it self-extinguish or keep burning?'
        },
        options: [
          {
            label: {
              ru: 'Самозатухает',
              en: 'Self-extinguishes'
            },
            next: 'thermoset_self_smell'
          },
          {
            label: {
              ru: 'Продолжает гореть',
              en: 'Continues to burn'
            },
            next: 'thermoset_cont_smell'
          }
        ]
      },
      thermoset_self_smell: {
        type: 'question',
        title: {
          ru: 'Самозатухающие термореактивные пластики',
          en: 'Self-extinguishing Thermosets'
        },
        text: {
          ru: 'Какой запах ощущается?',
          en: 'What odour do you notice?'
        },
        options: [
          {
            label: {
              ru: 'Рыбный запах',
              en: 'Fish-like smell'
            },
            next: 'melamine'
          },
          {
            label: {
              ru: 'Фенол',
              en: 'Phenol'
            },
            next: 'phenol_formaldehyde'
          },
          {
            label: {
              ru: 'Формальдегид',
              en: 'Formaldehyde'
            },
            next: 'urea_formaldehyde'
          }
        ]
      },
      melamine: {
        type: 'result',
        title: {
          ru: 'Меламиноформальдегид',
          en: 'Melamine Formaldehyde'
        },
        materials: [
          {
            name: {
              ru: 'Melamine Formaldehyde',
              en: 'Melamine Formaldehyde'
            },
            flame: {
              ru: 'Жёлтое пламя с голубым кончиком',
              en: 'Yellow flame with blue tip'
            },
            odour: {
              ru: 'Рыбный',
              en: 'Fish-like'
            },
            speed: {
              ru: 'Самозатухает',
              en: 'Self-extinguishing'
            },
            other: {
              ru: 'Разбухает и трескается',
              en: 'Swells and cracks'
            }
          }
        ]
      },
      phenol_formaldehyde: {
        type: 'result',
        title: {
          ru: 'Фенолформальдегид',
          en: 'Phenol Formaldehyde'
        },
        materials: [
          {
            name: {
              ru: 'Phenol Formaldehyde',
              en: 'Phenol Formaldehyde'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Фенол',
              en: 'Phenol'
            },
            speed: {
              ru: 'Самозатухает',
              en: 'Self-extinguishing'
            },
            other: {
              ru: 'Может тлеть, поверхность темнеет',
              en: 'May smoulder; surface darkens'
            }
          }
        ]
      },
      urea_formaldehyde: {
        type: 'result',
        title: {
          ru: 'Мочевиноформальдегид',
          en: 'Urea Formaldehyde'
        },
        materials: [
          {
            name: {
              ru: 'Urea Formaldehyde',
              en: 'Urea Formaldehyde'
            },
            flame: {
              ru: 'Жёлтое пламя с зеленовато-голубой каймой',
              en: 'Yellow flame with green-blue edge'
            },
            odour: {
              ru: 'Формальдегид',
              en: 'Formaldehyde'
            },
            speed: {
              ru: 'Самозатухает',
              en: 'Self-extinguishing'
            },
            other: {
              ru: 'Разбухает и трескается',
              en: 'Swells and cracks'
            }
          }
        ]
      },
      thermoset_cont_smell: {
        type: 'question',
        title: {
          ru: 'Термореактивные, продолжающие гореть',
          en: 'Burning Thermosets'
        },
        text: {
          ru: 'Какой запах ощущается?',
          en: 'What odour do you notice?'
        },
        options: [
          {
            label: {
              ru: 'Рыбный',
              en: 'Fish-like'
            },
            next: 'unsaturated_polyester'
          },
          {
            label: {
              ru: 'Фенол',
              en: 'Phenol'
            },
            next: 'silicone'
          },
          {
            label: {
              ru: 'Резкий аминовый',
              en: 'Sharp amine odour'
            },
            next: 'epoxy'
          }
        ]
      },
      unsaturated_polyester: {
        type: 'result',
        title: {
          ru: 'Ненасыщенный полиэфир',
          en: 'Unsaturated Polyester'
        },
        materials: [
          {
            name: {
              ru: 'Unsaturated Polyester',
              en: 'Unsaturated Polyester'
            },
            flame: {
              ru: 'Жёлтое пламя с голубыми краями',
              en: 'Yellow flame with blue edges'
            },
            odour: {
              ru: 'Рыбный',
              en: 'Fish-like'
            },
            speed: {
              ru: 'Продолжает гореть',
              en: 'Continues to burn'
            },
            other: {
              ru: 'Чёрный дым с сажей',
              en: 'Black smoke with soot'
            }
          }
        ]
      },
      silicone: {
        type: 'result',
        title: {
          ru: 'Силикон',
          en: 'Silicone'
        },
        materials: [
          {
            name: {
              ru: 'Silicone',
              en: 'Silicone'
            },
            flame: {
              ru: 'Ярко-жёлтое пламя',
              en: 'Bright yellow flame'
            },
            odour: {
              ru: 'Фенол',
              en: 'Phenol'
            },
            speed: {
              ru: 'Продолжает гореть',
              en: 'Continues to burn'
            },
            other: {
              ru: 'Дым светлый, но горение длительное',
              en: 'Light smoke, prolonged burning'
            }
          }
        ]
      },
      epoxy: {
        type: 'result',
        title: {
          ru: 'Эпоксидная смола',
          en: 'Epoxy Resin'
        },
        materials: [
          {
            name: {
              ru: 'Epoxy',
              en: 'Epoxy'
            },
            flame: {
              ru: 'Жёлтое пламя',
              en: 'Yellow flame'
            },
            odour: {
              ru: 'Резкий амин',
              en: 'Pungent amine'
            },
            speed: {
              ru: 'Продолжает гореть',
              en: 'Continues to burn'
            },
            other: {
              ru: 'Чёрный дым',
              en: 'Black smoke'
            }
          }
        ]
      }
    };

export { flow };
