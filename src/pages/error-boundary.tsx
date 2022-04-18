import React from 'react';

interface Props {}
type State = {
  hasError: boolean;
  errorMsg: string;
};

/*
 * 全局错误拦截
 */
class ErrorBoundary extends React.Component<Props, State> {
  state: State;

  props: any;

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMsg: error.message,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="align-center">{this.state.errorMsg}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
