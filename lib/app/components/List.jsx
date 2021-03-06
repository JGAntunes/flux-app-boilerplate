import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

export default class List extends Component {
  static propTypes = {
    loadingLabel: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
    nextPageUrl: PropTypes.string,
    pageCount: PropTypes.number,
    items: PropTypes.array,
    renderItem: PropTypes.func
  }

  static defaultProps = {
    isFetching: true,
    loadingLabel: 'Loading...'
  }

  render () {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel
    } = this.props

    const isEmpty = items.length === 0
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    const isLastPage = !nextPageUrl
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    )
  }

  renderLoadMore () {
    const { isFetching, onLoadMoreClick } = this.props
    return (
      <Button onClick={onLoadMoreClick} disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </Button>
    )
  }
}
