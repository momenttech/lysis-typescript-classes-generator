{{#each resources}}
import { {{ ucc title }} } from './{{ ucc title }}';
{{/each}}


export {
  {{#each resources}}
  {{ ucc title }},
  {{/each}}
}
