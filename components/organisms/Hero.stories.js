import StoryComponent from './Hero';

export default {
  title: 'Organisms/Hero',
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
