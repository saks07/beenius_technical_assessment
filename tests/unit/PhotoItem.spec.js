import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import PhotoItem from '@/components/Photos/PhotoItem.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faUsers, faImages, faCamera, faBars, faCircle, faEllipsisH, faBreadSlice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faUsers, faImages, faCamera, faBars, faCircle, faEllipsisH, faBreadSlice)

Vue.component('font-awesome-icon', FontAwesomeIcon);

const mockPropsData = {
    options: {
        details: true
    },
    photoData: {
        photo: {
            url: 'some-url',
            title: 'some title',
            id: 0
        },
        album: {
            title: 'some album title'
        },
        user: {
            name: 'some name'
        }
    }
};

const mockData = () => {
    return {
        details: {
            show: false,
            buttonIcon: 'ellipsis-h'
        }
    }
};

describe('Data details test on created hook', () => {

    // component mount
    const wrapper = mount(PhotoItem, {
        propsData: mockPropsData,
        mockData
    });

    const vmData = wrapper.vm.$data;

    test('Test show property value', () => {
        expect(vmData.details.show).toBe(false);
    });

    test('Test buttonIcon property value', () => {
        expect(vmData.details.buttonIcon).toBe('ellipsis-h');
    });

});

describe('Show details button', () => {

    // component mount
    const wrapper = mount(PhotoItem, {
        propsData: mockPropsData,
        ...mockData
    });

    const vmData = wrapper.vm.$data;

    const button = wrapper.find('#detailsButton');

    test('Test button exists', () => {
        expect(button.exists()).toBe(true);
    });

    test('Test button attribute id value', () => {
        expect(button.element.id).toBe('detailsButton');
    });

    button.trigger('click');

    test('Test show property value after click', () => {
        expect(vmData.details.show).toBe(true);
    });

    test('Test buttonIcon property value after click', () => {
        expect(vmData.details.buttonIcon).toBe('times');
    });

});

