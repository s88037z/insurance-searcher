import { factory, primaryKey, nullable } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
  policyholder: {
    id: primaryKey(() => crypto.randomUUID()),
    code: String,
    name: String,
    registration_date: String,
    introducer_code: String,
    l: nullable(() => null),
    r: nullable(() => null),
    parent: nullable(() => null),
  },
});

function formatCode(code: number): string {
  const codeStr = String(code);
  return "0".repeat(6 - codeStr.length) + codeStr;
}

export const initDb = (nums = 15) => {
  const queue = [];
  const existCodes = [];
  let code = 1;
  for (let i = 0; i < nums; i++) {
    const curCode = formatCode(code);
    existCodes.push(curCode);
    code++;
    const newPolicyholder = db.policyholder.create({
      code: curCode,
      name: faker.person.fullName(),
      registration_date: faker.date.past().toISOString(),
      introducer_code: faker.helpers.arrayElement(existCodes),
    });
    if (queue.length == 0) {
      queue.push(newPolicyholder);
      continue;
    }
    let inserted = db.policyholder.findFirst({
      where: {
        id: { equals: queue[0].id },
      },
    })!;
    while (inserted.r) {
      queue.shift();
      inserted = db.policyholder.findFirst({
        where: {
          id: { equals: queue[0].id },
        },
      })!;
    }
    db.policyholder.update({
      where: {
        id: {
          equals: inserted.id,
        },
      },
      data: !inserted.l
        ? {
            l: newPolicyholder.id,
          }
        : { r: newPolicyholder.id },
    });
    db.policyholder.update({
      where: {
        id: {
          equals: newPolicyholder.id,
        },
      },
      data: {
        parent: inserted.id,
      },
    });
    queue.push(newPolicyholder);
  }
};
