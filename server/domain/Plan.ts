export default interface Plan {
  name: string;
  id: string;
}

// TODO: env
export const StandardPlan: Plan = {
  name: 'Standard Plan',
  id: 'plan_E02hgYgsFY82e3'
};

export const BasicPlan: Plan = {
  name: 'Basic Plan',
  id: 'plan_E02hgKyVrcOZVM'
};

type PlanName = 'standard' | 'basic';

export const getPlan = (name: PlanName) => {
  switch (name) {
    case 'standard':
      return StandardPlan;
    case 'basic':
      return BasicPlan;
  }
};
