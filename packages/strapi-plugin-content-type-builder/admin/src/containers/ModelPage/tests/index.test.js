import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';
import { FormattedMessage } from 'react-intl';

import EmptyAttributesBlock from 'components/EmptyAttributesBlock';

import AttributeLi from '../../../components/AttributeLi';
import Block from '../../../components/Block';
import LeftMenuLink from '../../../components/LeftMenuLink';

import { ModelPage } from '../index';

import initialData from './initialData.json';

describe('<ModelPage />', () => {
  let props;
  const basePath = '/plugins/content-type-builder/models';

  beforeEach(() => {
    props = {
      match: {
        isExact: true,
        params: {
          modelName: 'user&source=users-permissions',
        },
        path: `${basePath}/user&source=users-permissions`,
        url: `${basePath}/:modelName`,
      },
      initialData: cloneDeep(initialData),
      modifiedData: cloneDeep(initialData),
      models: [
        { icon: 'fa-cube', name: 'permission', description: '', fields: 6, source: 'users-permissions' },
        { icon: 'fa-cube', name: 'user', description: '', fields: 6, source: 'users-permissions' },
        { icon: 'fa-cube', name: 'role', description: '', fields: 6, source: 'users-permissions' },
        { icon: 'fa-cube', name: 'product', description: 'super api', fields: 6 },
      ],
    };
  });

  it('should not crash', () => {
    shallow(<ModelPage {...props} />);
  });

  describe('CTB <ModelPage /> render', () => {
    it('should display the EmptyAttributeBlock if the model\'s attributes are empty', () => {
      props.initialData.user.attributes = {};
      props.modifiedData.user.attributes = {};

      const wrapper = shallow(<ModelPage {...props} />);

      expect(wrapper.find(EmptyAttributesBlock)).toHaveLength(1);
    });

    it('should display the Block if the model\'s attributes are not empty', () => {
      const wrapper = shallow(<ModelPage {...props} />);

      expect(wrapper.find(Block)).toHaveLength(1);
    });

    it('should display a singular text if the model\'s attributes relationships is one', () => {
      const wrapper = shallow(<ModelPage {...props} />);

      expect(wrapper.find(FormattedMessage).last().prop('id')).toContain('singular');
    });

    it('should display a singular text if the model\'s attributes relationships is one', () => {
      const wrapper = shallow(<ModelPage {...props} />);

      expect(wrapper.find(FormattedMessage).last().prop('id')).toContain('singular');
    });
  });

  describe('CTB <ModelPage /> instances', () => {
    describe('GetModel', () => {
      it('should return the model', () => {
        const { getModel } = shallow(<ModelPage {...props} />).instance();

        expect(getModel()).toEqual(initialData.user);
      });
    });

    describe('GetModelAttributes', () => {
      it('should return the model\'s attributes', () => {
        const { getModelAttributes } = shallow(<ModelPage {...props} />).instance();

        expect(getModelAttributes()).toEqual(initialData.user.attributes);
      });
    });

    describe('GetModelAttributesLength', () => {
      it('should return the model\'s attributes length', () => {
        const { getModelAttributesLength } = shallow(<ModelPage {...props} />).instance();

        expect(getModelAttributesLength()).toEqual(8);
      });
    });

    describe('GetModelDescription', () => {
      it('should return the model\'s description field', () => {
        const { getModelDescription } = shallow(<ModelPage {...props} />).instance();

        expect(getModelDescription()).toEqual('user model');
      });
    });

    describe('getModelName', () => {
      it('should return the model\'s name field', () => {
        const { getModelName } = shallow(<ModelPage {...props} />).instance();

        expect(getModelName()).toEqual('user');
      });
    });

    describe('getModelsNumber', () => {
      it('should return the number of models', () => {
        const { getModelsNumber } = shallow(<ModelPage {...props} />).instance();

        expect(getModelsNumber()).toEqual(4);
      });
    });

    describe('GetModelRelationShips', () => {
      it('should return the model`s relations', () => {
        const { getModelRelationShips } = shallow(<ModelPage {...props} />).instance();
        const { user: { attributes: { role } } } = initialData;

        expect(getModelRelationShips()).toEqual({ role });
      });
    });

    describe('getModelRelationShipsLength', () => {
      it('should return 0 if there is no relation', () => {
        props.match.params.modelName = 'product';
        props.match.path = `${basePath}/product`;

        const { getModelRelationShipsLength } = shallow(<ModelPage {...props} />).instance();

        expect(getModelRelationShipsLength()).toEqual(0);
      });

      it('should return 1 if there is 1 relations', () => {
        const wrapper = shallow(<ModelPage {...props} />);
        const { getModelRelationShipsLength } = wrapper.instance();

        expect(getModelRelationShipsLength()).toEqual(1);
      });
    });

    describe('GetSectionTitle', () => {
      it('should return a singular string for the product', () => {
        props.initialData = { user: props.initialData.user };
        props.modifiedData = { user: props.initialData.user };
        props.models = [props.models[1]];

        const { getSectionTitle } = shallow(<ModelPage {...props} />).instance();

        expect(getSectionTitle()).toContain('singular');
      });

      it('should return a plural string for the user', () => {
        const wrapper = shallow(<ModelPage {...props} />);
        const { getSectionTitle } = wrapper.instance();

        expect(getSectionTitle()).toContain('plural');
      });
    });

    describe('RenderLinks', () => {
      it('should render 4 links in the menu', () => {
        const wrapper = shallow(<ModelPage {...props} />);
        const links = wrapper.find(LeftMenuLink);

        expect(links).toHaveLength(4);
      });
    });

    describe('RenderLi', () => {
      it('should render 8 attributes', () => {
        const wrapper = shallow(<ModelPage {...props} />);
        const links = wrapper.find(AttributeLi);

        expect(links).toHaveLength(8);
      });
    });
  });
});
