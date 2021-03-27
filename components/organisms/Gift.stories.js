import StoryComponent from './Gift';

export default {
  title: 'Organisms/Gift',
  component: StoryComponent,
};

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent />',
});

export const Default = Template.bind({});
Default.args = {

};
