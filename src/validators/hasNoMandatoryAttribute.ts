type Attributes = string[];

export default function hasNoMandatoryAttribute(attributes: Attributes = [], data: object = {}): string | null {
  for(const attribute of attributes) {
    if (!Object.hasOwn(data, attribute as string)) {
      return attribute;
    }
  }

  return null;
}