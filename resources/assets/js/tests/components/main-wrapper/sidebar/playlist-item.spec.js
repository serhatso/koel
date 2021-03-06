import Component from '@/components/main-wrapper/sidebar/playlist-item.vue'
import factory from '@/tests/factory'
import { playlistStore } from '@/stores'

describe('component/main-wrapper/sidebar/playlist-item', () => {
  let playlist
  beforeEach(() => {
    playlist = factory('playlist', {
      id: 99,
      name: 'Foo'
    })
  })

  it('renders a playlist menu item', () => {
    shallow(Component, {
      propsData: { playlist }
    }).find('a[href="#!/playlist/99"]').text().should.equal('Foo')
  })

  it('renders the Favorites menu item', () => {
    shallow(Component, {
      propsData: {
        playlist: {
          name: 'Favorites'
        },
        type: 'favorites'
      }
    }).find('a[href="#!/favorites"]').text().should.equal('Favorites')
  })

  it('edits a playlist', () => {
    const updateStub = sinon.stub(playlistStore, 'update')
    const wrapper = shallow(Component, {
      propsData: { playlist }
    })
    wrapper.find('li.playlist').trigger('dblclick')
    wrapper.find('input[type=text]').trigger('blur')
    updateStub.calledWith(playlist).should.be.true
  })

  it("doesn't allow editing Favorites item", () => {
    const wrapper = shallow(Component, {
      propsData: {
        playlist: { name: 'Favorites' },
        type: 'favorites'
      }
    })
    wrapper.find('li.favorites').trigger('dblclick')
    wrapper.contains('input[type=text]').should.be.false
  })
})
