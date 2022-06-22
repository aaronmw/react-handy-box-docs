import fs from 'fs';

const buildNavigation = async () => {
  const demoDir = [process.cwd(), 'docs'].join('');
  const topLevelFiles = fs.readdirSync(demoDir);

  return topLevelFiles;
};

export default buildNavigation;
