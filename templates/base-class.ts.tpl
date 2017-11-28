// This file should not be modified, as it can be overwritten by the generator.
// The '{{ ucc resource.title }}' class is here for customizations and will not be touched.

{{#dependencies resource}}
import { {{ type.type }} } from '../{{ type.type }}';
{{/dependencies}}

export class {{ ucc resource.title }}Base {
  public static readonly _resource: string = '{{ resource.name }}';
  get _resource(): string { return {{ ucc resource.title }}Base._resource; };

  {{#each resource.fields}}
  {{#unless writable}}readonly {{/unless}}{{ name }}: {{ jsType type }};
  {{/each}}

  {{#each resource.fields}}
  {{#unless type.scalar}}
  {{#if writable}}
  set{{ ucc name }}(id: number): {{ ucc ../resource.title }}Base {
    this.{{ name }} = new {{ type.type }}();
    this.{{ name }}.id = id;
    this.{{ name }}['@id'] = '/{{ type.resource }}/' + id;
    return this;
  }

  {{/if}}
  {{/unless}}
  {{/each}}
}
